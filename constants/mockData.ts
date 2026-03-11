export interface Transaction {
    id: string;
    title: string;
    subtitle: string;
    amount: number;
    type: "income" | "expense";
    date: string;
    category: string;
    icon: string;
}

export interface Card {
    id: string;
    type: "debit" | "credit";
    number: string;
    holder: string;
    expiry: string;
    cvv: string;
    balance: number;
    limit: number;
    color: string;
    brand: "visa" | "mastercard";
}

export interface Account {
    id: string;
    name: string;
    number: string;
    balance: number;
    currency: string;
    type: "savings" | "checking" | "investment";
}

export const mockUser = {
    name: "Alexandra Chen",
    email: "alex.chen@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
};

export const mockAccounts: Account[] = [
    {
        id: "1",
        name: "Primary Checking",
        number: "**** 4582",
        balance: 24580.5,
        currency: "USD",
        type: "checking",
    },
    {
        id: "2",
        name: "High-Yield Savings",
        number: "**** 7391",
        balance: 127500.0,
        currency: "USD",
        type: "savings",
    },
    {
        id: "3",
        name: "Investment Portfolio",
        number: "**** 6247",
        balance: 45230.75,
        currency: "USD",
        type: "investment",
    },
];

export const mockCards: Card[] = [
    {
        id: "1",
        type: "debit",
        number: "4582 8934 1205 7391",
        holder: "Alexandra Chen",
        expiry: "12/28",
        cvv: "***",
        balance: 24580.5,
        limit: 50000,
        color: "#10B981",
        brand: "visa",
    },
    {
        id: "2",
        type: "credit",
        number: "5534 8912 6734 9021",
        holder: "Alexandra Chen",
        expiry: "09/27",
        cvv: "***",
        balance: 3250.0,
        limit: 15000,
        color: "#6366F1",
        brand: "mastercard",
    },
];

export const mockTransactions: Transaction[] = [
    {
        id: "1",
        title: "Apple Store",
        subtitle: "Electronics",
        amount: 1299.0,
        type: "expense",
        date: "Today, 2:34 PM",
        category: "shopping",
        icon: "shopping-bag",
    },
    {
        id: "2",
        title: "Salary Deposit",
        subtitle: "TechCorp Inc.",
        amount: 8500.0,
        type: "income",
        date: "Yesterday, 9:00 AM",
        category: "salary",
        icon: "briefcase",
    },
    {
        id: "3",
        title: "Netflix Subscription",
        subtitle: "Entertainment",
        amount: 15.99,
        type: "expense",
        date: "Mar 4, 2024",
        category: "entertainment",
        icon: "film",
    },
    {
        id: "4",
        title: "Uber Ride",
        subtitle: "Transportation",
        amount: 24.5,
        type: "expense",
        date: "Mar 3, 2024",
        category: "transport",
        icon: "car",
    },
    {
        id: "5",
        title: "Starbucks",
        subtitle: "Food & Dining",
        amount: 8.75,
        type: "expense",
        date: "Mar 3, 2024",
        category: "food",
        icon: "coffee",
    },
    {
        id: "6",
        title: "Freelance Payment",
        subtitle: "Design Project",
        amount: 2500.0,
        type: "income",
        date: "Mar 2, 2024",
        category: "freelance",
        icon: "palette",
    },
    {
        id: "7",
        title: "Whole Foods Market",
        subtitle: "Groceries",
        amount: 156.32,
        type: "expense",
        date: "Mar 1, 2024",
        category: "groceries",
        icon: "shopping-cart",
    },
    {
        id: "8",
        title: "Spotify Premium",
        subtitle: "Entertainment",
        amount: 9.99,
        type: "expense",
        date: "Feb 28, 2024",
        category: "entertainment",
        icon: "music",
    },
];

export const quickActions = [
    { id: "1", name: "Transfer", icon: "arrow-right-left", color: "#10B981" },
    { id: "2", name: "Pay Bills", icon: "receipt", color: "#F59E0B" },
    { id: "3", name: "Top Up", icon: "plus", color: "#3B82F6" },
    { id: "4", name: "More", icon: "grid-3x3", color: "#8B5CF6" },
];

export const spendingCategories = [
    { name: "Shopping", amount: 2450, percentage: 35, color: "#10B981" },
    { name: "Food", amount: 1200, percentage: 18, color: "#F59E0B" },
    { name: "Transport", amount: 890, percentage: 13, color: "#3B82F6" },
    { name: "Entertainment", amount: 650, percentage: 9, color: "#8B5CF6" },
    { name: "Others", amount: 1650, percentage: 25, color: "#6B7280" },
];
