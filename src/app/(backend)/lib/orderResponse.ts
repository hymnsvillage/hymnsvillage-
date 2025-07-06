export const orderResponse = ({
  data = [],
  limit = 20,
  page = 0,
}: {
  data: unknown[];
  limit: number;
  page: number;
}) => {
  const total = data.length ?? 0;
  const totalPages = Math.ceil(total / limit);
  return {
    page,
    limit,
    total,
    totalPages,
    nextPage: page < totalPages ? page + 1 : null,
    prevPage: page > 1 ? page - 1 : null,
  };
};
