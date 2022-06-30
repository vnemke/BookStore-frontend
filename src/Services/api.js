export async function getOneBook(bookId) {
  const response = await fetch(`/api/books/${bookId}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch data.");
  }

  const book = {
    id: bookId,
    ...data,
  };

  return book;
}
