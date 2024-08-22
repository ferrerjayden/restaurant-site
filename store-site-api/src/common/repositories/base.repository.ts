import { Model } from 'mongoose'

// do this in the future
export class BaseRepository<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async findAll(): Promise<T[]> {
    return this.model.find().exec()
  }

  async findById(id: string): Promise<T> {
    return this.model.findById(id).exec()
  }

  async create(entity: Partial<T>): Promise<T> {
    return this.model.create(entity)
  }

  async update(id: string, entity: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, entity).exec()
  }

  async delete(id: string): Promise<T> {
    return this.model.findByIdAndDelete(id)
  }
}
