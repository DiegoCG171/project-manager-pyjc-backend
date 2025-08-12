export interface  PaginationResult<T>{

    data: T[];

    total: number;

    // currentPage: number;
    
    page: number;

    limit: number;

    totalPages: number;
}