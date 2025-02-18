import type { AxiosInstance } from 'axios';
import type { NotebookType } from '../model/types/types';
import { notebookSchema } from '../model/schema/schema';
import { axiosInstance } from '@/shared';
import { ZodError } from 'zod';

class NotebookService {
  constructor(private readonly client: AxiosInstance) {}

  async getNotebooks(): Promise<NotebookType[]> {
    try {
      const res = await this.client.get('/notebooks');
      return notebookSchema.array().parse(res.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Validation error in NotebookService: ', error.issues);
      }
      throw error;
    }
  }
}

export default new NotebookService(axiosInstance);
