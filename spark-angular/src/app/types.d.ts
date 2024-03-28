interface UserInfo {
    id:         number;
    firstname:  string;
    lastname:   string;
    email:      string;
    last_login: Date;
    updated_at: Date;
    created_at: Date;
}

interface ProjectDetailed {
    id:           number;
    name:         string;
    amount:       number;
    user_id:      number;
    customer_id:  number;
    updated_at:   Date;
    created_at:   Date;
    customer: Customer;
    expenses: Expense[];
    installments: Installment[];
}

interface Installment {
    id:         number;
    amount:     number;
    project_id: number;
    created_at: Date;
    updated_at: Date;
}

interface Expense {
    id:         number;
    amount:     number;
    project_id: number;
    created_at: Date;
    updated_at: Date;
}

interface Customer {
    id:         number;
    name:       string;
    phone:      string;
    user_id:    number;
    updated_at: Date;
    created_at: Date;
}
