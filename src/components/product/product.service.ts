import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '@entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update.product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProduct: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create({ ...createProduct });
    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: id },
    });
    return product;
  }

  async update(id: string, updateProduct: UpdateProductDto): Promise<Product> {
    await this.productRepository.update(id, updateProduct);
    return this.findOne(id);
  }

  async delete(id: string): Promise<Product> {
    await this.productRepository.delete(id);
    return this.findOne(id);
  }
}
