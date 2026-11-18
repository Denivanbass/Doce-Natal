'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Upload,
  Link as LinkIcon,
  Sparkles,
  CheckCircle2,
  Image as ImageIcon,
  Save,
} from 'lucide-react';
import { Product, formatBRL } from '@/data/products';
import { createProductAction } from '@/app/(backend)/_actions/produtos/createProductsAction';
 // Ajuste o caminho se necessário

type NewProductForm = Omit<Product, 'id'>;

export default function NovoProdutoPage() {
  const [imageMode, setImageMode] = useState<'file' | 'url'>('file');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<NewProductForm>({
    name: '',
    small_description: '',
    description: '',
    price: 0,
    weight: '',
    tag: '',
    image: '',
  });

  const [priceInput, setPriceInput] = useState('');

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d.,]/g, '');
    setPriceInput(raw);

    const numericValue = parseFloat(raw.replace(',', '.'));
    setFormData((prev) => ({
      ...prev,
      price: isNaN(numericValue) ? 0 : numericValue,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, image: previewUrl }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(false);
    setErrorMessage(null);

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('small_description', formData.small_description);
      payload.append('description', formData.description);
      payload.append('price', String(formData.price));
      payload.append('weight', formData.weight);
      if (formData.tag) payload.append('tag', formData.tag);

      if (imageMode === 'file' && imageFile) {
        payload.append('imageFile', imageFile);
      } else {
        payload.append('imageUrl', formData.image);
      }

      // Chamada real da Server Action
      const response = await createProductAction(payload);

      if (response.success) {
        setSuccessMessage(true);
        // Limpa o formulário após o cadastro com sucesso
        setFormData({
          name: '',
          small_description: '',
          description: '',
          price: 0,
          weight: '',
          tag: '',
          image: '',
        });
        setPriceInput('');
        setImageFile(null);
      } else {
        setErrorMessage(response.error || 'Erro ao cadastrar produto.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      setErrorMessage('Ocorreu um erro inesperado ao salvar.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C1E16] font-sans selection:bg-[#8B1E24] selection:text-[#FDFBF7]">
      <header className="bg-[#2C1E16] text-[#FDFBF7] border-b border-[#C59B27]/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#C59B27] hover:underline mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para a Vitrine
            </Link>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#FDFBF7]">
              Cadastrar Nova{' '}
              <span className="text-[#C59B27] italic">Sobremesa</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#FDFBF7]/75">
              Adicione um novo item ao cardápio especial de Natal.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#2C1E16]/80 border border-[#C59B27]/50 px-3.5 py-1.5 rounded-full text-xs self-start sm:self-center">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span className="text-[#FDFBF7]/90">Painel do Catálogo</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 bg-white rounded-2xl border border-[#2C1E16]/10 p-6 sm:p-8 shadow-sm space-y-6"
          >
            {successMessage && (
              <div className="flex items-center gap-3 bg-[#1E4D3B]/10 border border-[#1E4D3B]/30 text-[#1E4D3B] px-4 py-3 rounded-xl text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Produto cadastrado e salvo no banco com sucesso!</span>
              </div>
            )}

            {errorMessage && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-[#2C1E16]"
              >
                Nome da Sobremesa *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Ex: Pavê Supremo de Chocolate"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#2C1E16]/20 bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#2C1E16] placeholder:text-[#2C1E16]/40 focus:border-[#8B1E24] focus:outline-none focus:ring-2 focus:ring-[#8B1E24]/15"
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="price"
                  className="block text-sm font-semibold text-[#2C1E16]"
                >
                  Preço (R$) *
                </label>
                <input
                  id="price"
                  name="price"
                  type="text"
                  inputMode="decimal"
                  required
                  placeholder="79,90"
                  value={priceInput}
                  onChange={handlePriceChange}
                  className="w-full rounded-lg border border-[#2C1E16]/20 bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#2C1E16] placeholder:text-[#2C1E16]/40 focus:border-[#8B1E24] focus:outline-none focus:ring-2 focus:ring-[#8B1E24]/15"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="weight"
                  className="block text-sm font-semibold text-[#2C1E16]"
                >
                  Peso / Rendimento *
                </label>
                <input
                  id="weight"
                  name="weight"
                  type="text"
                  required
                  placeholder="Ex: 1,2kg"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#2C1E16]/20 bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#2C1E16] placeholder:text-[#2C1E16]/40 focus:border-[#8B1E24] focus:outline-none focus:ring-2 focus:ring-[#8B1E24]/15"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="tag"
                  className="block text-sm font-semibold text-[#2C1E16]"
                >
                  Selo (Opcional)
                </label>
                <input
                  id="tag"
                  name="tag"
                  type="text"
                  placeholder="Ex: Mais Vendido"
                  value={formData.tag || ''}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#2C1E16]/20 bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#2C1E16] placeholder:text-[#2C1E16]/40 focus:border-[#8B1E24] focus:outline-none focus:ring-2 focus:ring-[#8B1E24]/15"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="small_description"
                className="block text-sm font-semibold text-[#2C1E16]"
              >
                Descrição Curta (Subtítulo) *
              </label>
              <input
                id="small_description"
                name="small_description"
                type="text"
                required
                placeholder="Ex: Camadas de chocolate belga 70% e creme artesanal"
                value={formData.small_description}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#2C1E16]/20 bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#2C1E16] placeholder:text-[#2C1E16]/40 focus:border-[#8B1E24] focus:outline-none focus:ring-2 focus:ring-[#8B1E24]/15"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-[#2C1E16]"
              >
                Descrição Completa *
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                placeholder="Descreva os ingredientes, texturas e detalhes da sobremesa..."
                value={formData.description}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#2C1E16]/20 bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#2C1E16] placeholder:text-[#2C1E16]/40 focus:border-[#8B1E24] focus:outline-none focus:ring-2 focus:ring-[#8B1E24]/15 resize-none"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-[#2C1E16]">
                  Imagem do Produto *
                </label>
                <div className="inline-flex rounded-lg bg-[#FDFBF7] p-1 border border-[#2C1E16]/15 text-xs">
                  <button
                    type="button"
                    onClick={() => setImageMode('file')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                      imageMode === 'file'
                        ? 'bg-[#2C1E16] text-[#FDFBF7]'
                        : 'text-[#2C1E16]/70 hover:text-[#2C1E16]'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Arquivo
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageMode('url')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                      imageMode === 'url'
                        ? 'bg-[#2C1E16] text-[#FDFBF7]'
                        : 'text-[#2C1E16]/70 hover:text-[#2C1E16]'
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    URL
                  </button>
                </div>
              </div>

              {imageMode === 'file' ? (
                <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-[#2C1E16]/20 hover:border-[#C59B27] rounded-xl bg-[#FDFBF7] cursor-pointer transition-colors px-4 text-center">
                  <Upload className="w-7 h-7 text-[#C59B27] mb-2" />
                  <span className="text-sm font-medium text-[#2C1E16]">
                    {imageFile
                      ? imageFile.name
                      : 'Clique para selecionar uma foto da sobremesa'}
                  </span>
                  <span className="text-xs text-[#2C1E16]/55 mt-1">
                    PNG, JPG ou WEBP (proporção 4:3 recomendada)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required={!formData.image}
                    className="hidden"
                  />
                </label>
              ) : (
                <input
                  name="image"
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#2C1E16]/20 bg-[#FDFBF7] px-4 py-2.5 text-sm text-[#2C1E16] placeholder:text-[#2C1E16]/40 focus:border-[#8B1E24] focus:outline-none focus:ring-2 focus:ring-[#8B1E24]/15"
                />
              )}
            </div>

            <div className="pt-4 border-t border-[#2C1E16]/10 flex items-center justify-end gap-3">
              <Link
                href="/"
                className="px-5 py-2.5 rounded-lg border border-[#2C1E16]/20 text-sm font-medium text-[#2C1E16]/80 hover:bg-[#2C1E16]/5 transition-colors"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#1E4D3B] hover:bg-[#163A2C] disabled:opacity-60 active:scale-[0.98] text-[#FDFBF7] px-6 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {isSubmitting ? 'Salvando...' : 'Salvar Produto'}
              </button>
            </div>
          </form>

          <aside className="lg:col-span-5 lg:sticky lg:top-8 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C59B27]">
                Pré-visualização na Vitrine
              </span>
              <span className="text-xs text-[#2C1E16]/60">Tempo real</span>
            </div>

            <div className="group bg-white rounded-2xl border border-[#2C1E16]/10 overflow-hidden shadow-md flex flex-col">
              <div className="relative h-60 overflow-hidden bg-[#EFE6D8] flex items-center justify-center">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt={formData.name || 'Pré-visualização do produto'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-[#2C1E16]/40 gap-2">
                    <ImageIcon className="w-10 h-10" />
                    <span className="text-xs">Aguardando imagem...</span>
                  </div>
                )}

                {formData.tag && (
                  <span className="absolute top-3 left-3 bg-[#8B1E24] text-[#FDFBF7] text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {formData.tag}
                  </span>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2">
                  <span className="text-xs font-medium text-[#C59B27] block">
                    {formData.weight || 'Peso / Rendimento'}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#2C1E16]">
                    {formData.name || 'Nome da Sobremesa'}
                  </h3>
                  <p className="text-sm text-[#2C1E16]/75 leading-relaxed">
                    {formData.description ||
                      'A descrição completa da sobremesa aparecerá aqui exatamente como o cliente verá na vitrine.'}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#2C1E16]/10 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-sm text-[#2C1E16]/80 block">
                      Valor unitário
                    </span>
                    <span className="text-2xl font-bold text-[#2C1E16]">
                      {formatBRL(formData.price)}
                    </span>
                  </div>

                  <button
                    type="button"
                    disabled
                    className="bg-[#1E4D3B] text-[#FDFBF7] px-5 py-2.5 rounded-lg font-semibold text-sm opacity-90 cursor-default"
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}