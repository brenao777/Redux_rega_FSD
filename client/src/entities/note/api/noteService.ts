import type { AxiosInstance } from 'axios';
import type { NoteFormType, NoteType } from '../model/types/types';
import { noteSchema } from '../model/shema/shema';
import { axiosInstance } from '@/shared';
import { ZodError } from 'zod';

class NoteService {
  constructor(private readonly client: AxiosInstance) {}

  async getNotes(): Promise<NoteType[]> {
    try {
      const res = await this.client.get('/notes');
      return noteSchema.array().parse(res.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Validation error in NoteService: ', error.issues);
      }
      throw error;
    }
  }

  async addNotes(note: NoteFormType): Promise<NoteType> {
    try {
      const res = await this.client.post('/notes', note);
      return noteSchema.parse(res.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Validation error in NoteService: ', error.issues);
      }
      throw error;
    }
  }

  async deleteNote(id: number): Promise<number> {
    try {
      await this.client.delete(`/notes/${String(id)}`);
      return id;
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Validation error in NoteService: ', error.issues);
      }
      throw error;
    }
  }

  async editNote(id: number, data: NoteFormType): Promise<NoteType> {
    try {
      const res = await this.client.put(`/notes/${String(id)}`, data);
      return noteSchema.parse(res.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Validation error in NoteService: ', error.issues);
      }
      throw error;
    }
  }

  async search(data: string): Promise<NoteType[]> {
    try {
      const res = await this.client.get(`/notes?search=${data}`);
      return noteSchema.array().parse(res.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Validation error in NoteService: ', error.issues);
      }
      throw error;
    }
  }
}

export default new NoteService(axiosInstance);
