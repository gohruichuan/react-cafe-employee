interface Employee{
    id: string,
    cafeId: string,
    name: string,
    email_address: string,
    phone_number: number
    gender: "Male" | "Female",
    start_date: string
}

interface Cafe{
    id: string,
    name: string,
    description: string,
    logo?: string,
    location: string,
}

export type { Employee, Cafe }
