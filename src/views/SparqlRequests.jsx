import React, { useState } from "react";

const sparqlQueries = [
    {
        label: "Lister les aliments (nom commence par 'A')",
        query: `
PREFIX inf4188: <http://www.semanticweb.org/macdallas/ontologies/2025/4/inf4188#>
SELECT ?food ?name WHERE {
  ?food a inf4188:Food ;
        inf4188:hasName ?name .
  FILTER(STRSTARTS(LCASE(?name), "a"))
}
        `.trim()
    },
    {
        label: "Lister les maladies (avec ou sans symptôme)",
        query: `
PREFIX inf4188: <http://www.semanticweb.org/macdallas/ontologies/2025/4/inf4188#>
SELECT ?disease ?name ?symptomName WHERE {
  ?disease a inf4188:Disease ;
           inf4188:hasName ?name .
  OPTIONAL {
    ?disease inf4188:hasSymptom ?symptom .
    ?symptom inf4188:hasName ?symptomName .
  }
}
        `.trim()
    },
    {
        label: "Lister les groupes alimentaires (sauf ceux sans nom)",
        query: `
PREFIX inf4188: <http://www.semanticweb.org/macdallas/ontologies/2025/4/inf4188#>
SELECT ?group ?name WHERE {
  ?group a inf4188:FoodGroup .
  OPTIONAL { ?group inf4188:hasName ?name . }
  FILTER(BOUND(?name))
}
        `.trim()
    },
    {
        label: "Lister les symptômes",
        query: `
PREFIX inf4188: <http://www.semanticweb.org/macdallas/ontologies/2025/4/inf4188#>
SELECT ?symptom ?name WHERE {
  ?symptom a inf4188:Symptom ;
           inf4188:hasName ?name .
}
        `.trim()
    },
    {
        label: "Lister les aliments avec leur image (si disponible)",
        query: `
PREFIX inf4188: <http://www.semanticweb.org/macdallas/ontologies/2025/4/inf4188#>
SELECT ?food ?name ?image WHERE {
  ?food a inf4188:Food ;
        inf4188:hasName ?name .
  OPTIONAL { ?food inf4188:hasImage ?image . }
}
        `.trim()
    }
];

const SparqlRequest = () => {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const goHome = () => {
        window.location.href = "/";
    };

    const executeQuery = async () => {
        setLoading(true);
        setError("");
        setResult("");
        try {
            const response = await fetch("/fuseki/inf4188/sparql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/sparql-query"
                },
                body: query
            });
            if (!response.ok) {
                throw new Error("Erreur lors de l'exécution de la requête");
            }
            const text = await response.text();
            setResult(text);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10">
            <button
                onClick={goHome}
                className="mb-6 px-4 py-2 bg-gray-200 cursor-pointer text-gray-800 rounded hover:bg-gray-300 transition"
            >
                Retour à l'accueil
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Requêtes SPARQL</h2>
            <div className="flex flex-wrap gap-4 justify-center mb-6">
                {sparqlQueries.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={() => setQuery(item.query)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        {item.label}
                    </button>
                ))}
            </div>
            <textarea
                className="w-full h-56 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none bg-gray-50"
                value={query}
                onChange={e => setQuery(e.target.value)}
                spellCheck={false}
            />
            <button
                onClick={executeQuery}
                className="mt-4 px-4 py-2 cursor-pointer bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                disabled={loading || !query.trim()}
            >
                {loading ? "Exécution..." : "Exécuter"}
            </button>
            {error && (
                <div className="mt-4 text-red-600">{error}</div>
            )}
            {result && (
                <pre className="mt-4 p-4 bg-gray-100 rounded text-sm overflow-x-auto">{result}</pre>
            )}
        </div>
    );
};

export default SparqlRequest;