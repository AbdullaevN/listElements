export interface Item {
    id: number;  
    name: string;
    full_name: string;  
    owner: {
        login: string; 
        avatar_url: string; 
    };
    html_url: string;  
    description: string;  
    stargazers_count: number;  
    forks_count: number; 
    created_at: string; 
    updated_at: string;  
}
