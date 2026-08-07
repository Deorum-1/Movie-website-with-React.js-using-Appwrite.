import { Client, Databases, Query, ID } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID || "6a73b6b2002534030732";
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject(PROJECT_ID);

const isAppwriteConfigured = Boolean(DATABASE_ID && COLLECTION_ID);

const database = isAppwriteConfigured ? new Databases(client) : null;

const ensureAppwriteConfigured = () => {
    if (!isAppwriteConfigured) {
        console.warn(
            "Appwrite is not fully configured. Set VITE_APPWRITE_DATABASE_ID and VITE_APPWRITE_COLLECTION_ID to enable Appwrite features."
        );
        return false;
    }
    return true;
};

export const updateSearchCount = async (searchTerm, movie) => {
    if (!searchTerm || !searchTerm.trim()) return;
    if (!ensureAppwriteConfigured()) return;

    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal("searchTerm", searchTerm)]);

        if (result.documents.length > 0) {
            const document = result.documents[0];
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, document.$id, { count: document.count + 1 });
        } else {
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    searchTerm,
                    count: 1,
                    movie_id: movie?.id,
                    poster_url: movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
                }
            );
        }
    } catch (error) {
        console.error(error);
    }
};

export const getTrendingMovies = async () => {
    if (!ensureAppwriteConfigured()) return [];

    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.limit(5), Query.orderDesc("count")]);
        return result.documents;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export { client, database };
