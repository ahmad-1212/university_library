type STATUS_BOOK_ENUM = "BORROWED" | "RETURNED";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  createdAt: Date | null;
}

interface User {
  id: string;
  fullName: string;
  email: string;
  universityId: number;
  universityCard: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | null;
  role: "USER" | "ADMIN" | null;
  createdAt: Date | null;
  borrowedBooks?: number; // Add this for the borrowed books count
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}

interface BookParams {
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  videoUrl: string;
  summary: string;
}

interface BorrowBookParams {
  bookId: string;
  userId: string;
}

interface BorrowRecord {
  id: string;
  userId?: string;
  book: Partial<Book>;
  borrowDate: Date;
  dueDate: string;
  returnDate: string | null;
  status: STATUS_BOOK_ENUM;
  createdAt: Date | null;
  user?: Partial<User>;
}

interface SearchParams {
  query?: string;
  page?: string;
  sort?: string;
  filter?: string;
}
