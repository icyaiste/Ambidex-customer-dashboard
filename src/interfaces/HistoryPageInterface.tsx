interface PagedListProps<T> {
  items: T[];
  columns: Array<{
    title: string;
    selector: (element: T) => string;
    className?: string;
  }>;
  filterOn: Array<(element: T) => string> | null;
}

export default PagedListProps;
