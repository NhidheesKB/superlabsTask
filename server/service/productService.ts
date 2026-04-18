export default class ProductService {
  async addproduct(
    fileName: string,
    name: string,
    stock: number,
    description: string,
    price: number,
  ) {
    return await prisma.product.create({
      data: { images: fileName, name, stock, description, price },
    });
  }

  async listProduct(id: number) {
    return await prisma.product.findMany({
      orderBy: { id: "asc" },
      where: { id: { gte: id } },
      take: 10,
    });
  }
}
