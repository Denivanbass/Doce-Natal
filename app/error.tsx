


"use client";
export default function PaginaErro({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
            <h2 className="text-red-700 font-bold">Ocorreu um erro ao carregar a página.</h2>
            <button onClick={reset} className="mt-2 px-3 py-1 bg-red-600 text-white rounded">Tentar
                Novamente</button>
        </div>
    );
}
