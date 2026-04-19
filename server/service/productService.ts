export default class ProductService {
  async addproduct(
    fileName: string,
    name: string,
    stock: number,
    description: string,
    price: number,
  ) {
    return await prisma.product.create({
      data: { images: fileName, name, stock,  description, price },
    });
  }

  async listProduct(id: number) {
    return await prisma.product.findMany({
      orderBy: { id: "asc" },
      where: { id: { gte: id } },
      take: 10,
    });
  }

  async editProduct(
    body: {
      id: number;
      name?: string | undefined;
      description?: string | undefined;
      price?: number | undefined;
      stock?: number | undefined;
    } & { images?: string },
  ) {
    const { id, ...updatefield } = body;
    return await prisma.product.update({
      where: { id },
      data: updatefield,
    });
  }
  async deleteProduct(id: number) {
    return await prisma.product.delete({
      where: { id },
      select: { images: true },
    });
  }

  async searchProduct(search: string) {
    return await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      },
      orderBy: { id: "asc" },

    });
  }

  async showDetails(id:number){
    return await prisma.product.findFirst({
      where:{id},
      include:{reviews:true}
    })
  }
}
