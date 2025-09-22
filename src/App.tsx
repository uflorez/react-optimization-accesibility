import CharacterCard from './components/CharacterCard';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import Pagination from './components/Pagination';
import { useCharacters } from './hooks/useCharacters';
import headerImage from './assets/o6cwlzg3exk41.png';
import footerImage from './assets/rick-and-morty-escape-facebook-cover.jpg';

function App() {
  const { 
    characters, 
    loading, 
    error, 
    pagination, 
    handleSearch, 
    handlePageChange 
  } = useCharacters();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header with accessibility issues */}
      <div className="relative bg-gradient-to-r from-green-400 to-blue-600 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={headerImage} 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 py-8 text-center">
          <div className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
            Rick and Morty Characters
          </div>
          <div className="text-xl text-white/90 drop-shadow-md">
            Explore characters from the multiverse
          </div>
        </div>
      </div>

      {/* Main content with poor structure */}
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <SearchBar onSearch={handleSearch} isLoading={loading} />

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <div className="font-medium">Error:</div>
              <div>{error}</div>
            </div>
          )}

          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {characters.length === 0 && !error ? (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-xl">No characters found</div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                    {characters.map((character) => (
                      <CharacterCard key={character.id} character={character} />
                    ))}
                  </div>

                  <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                    hasNext={pagination.hasNext}
                    hasPrev={pagination.hasPrev}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Footer with accessibility issues */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={footerImage} 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">Adventure Awaits!</div>
            <div className="text-gray-300 mb-4">
              Discover more characters from the infinite multiverse of Rick and Morty
            </div>
            <div className="flex justify-center items-center space-x-4 text-sm text-gray-400">
              <span>© 2024 Rick and Morty Character Explorer</span>
              <span>•</span>
              <span>Powered by Rick and Morty API</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
