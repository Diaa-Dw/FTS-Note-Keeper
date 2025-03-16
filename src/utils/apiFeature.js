class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    if (this.queryString.query) {
      const searchTerm = this.queryString.query;
      this.query = this.query.find({
        $or: [
          {
            title: { $regex: searchTerm, $options: "i" },
          },
          {
            content: { $regex: searchTerm, $options: "i" },
          },
        ],
      });
    }
    return this;
  }

  paginate() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  async execute() {
    //count the total number of documents that match the query conditions (without pagination)
    const totalCount = await this.query.model.countDocuments(
      this.query._conditions
    );
    console.log("🚀 ~ APIFeatures ~ execute ~ totalCount:", totalCount);

    //execute the query to get the pagination results
    const results = await this.query;

    //calculate the next and prev page values
    const limit = Number(this.queryString.limit) || 10;
    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = Number(this.queryString.page) || 1;

    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const prevPage = currentPage > 1 ? currentPage - 1 : null;

    return {
      results,
      pagination: {
        next: nextPage,
        prev: prevPage,
        page: currentPage,
        limit: limit,
        totalPages: totalPages,
        totalCount: totalCount,
      },
    };
  }
}

module.exports = APIFeatures;
