interface PaginationInfo {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    hasPrevious: boolean;
    hasNext: boolean;
}


export type { PaginationInfo }