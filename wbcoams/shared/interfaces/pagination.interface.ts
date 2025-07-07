export interface IPagination {
    page?: number;
    limit?: number;
    includeDeleted?: boolean;
    from?: Date;
    to?: Date;
}