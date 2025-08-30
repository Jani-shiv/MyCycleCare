import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = __DEV__ 
  ? 'http://localhost:8000' 
  : 'https://your-production-api.com';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          await AsyncStorage.removeItem('accessToken');
          // Navigate to login screen
        }
        return Promise.reject(error);
      }
    );
  }

  // Authentication
  async login(email: string, password: string) {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    
    const response = await this.api.post('/auth/token', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    if (response.data.access_token) {
      await AsyncStorage.setItem('accessToken', response.data.access_token);
    }
    
    return response.data;
  }

  async register(userData: any) {
    return this.api.post('/auth/register', userData);
  }

  async logout() {
    await AsyncStorage.removeItem('accessToken');
  }

  // User
  async getCurrentUser() {
    return this.api.get('/auth/me');
  }

  // Events
  async getEvents() {
    return this.api.get('/events/');
  }

  async createEvent(eventData: any) {
    return this.api.post('/events/', eventData);
  }

  async updateEvent(eventId: number, eventData: any) {
    return this.api.put(`/events/${eventId}`, eventData);
  }

  async deleteEvent(eventId: number) {
    return this.api.delete(`/events/${eventId}`);
  }

  // Academics
  async getCourses() {
    return this.api.get('/academics/courses');
  }

  async getAssignments() {
    return this.api.get('/academics/assignments');
  }

  async getAttendance() {
    return this.api.get('/academics/attendance');
  }

  // Campus Map
  async searchBuildings(query: string) {
    return this.api.get('/campus-map/search', {
      params: { q: query }
    });
  }

  // Community
  async getClubs() {
    return this.api.get('/community/clubs');
  }

  async getChatMessages() {
    return this.api.get('/community/chat');
  }

  async sendChatMessage(messageData: any) {
    return this.api.post('/community/chat', messageData);
  }

  // AI Assistant
  async askAssistant(question: string, model: string = 'claude') {
    return this.api.post('/assistant/ask', {
      question,
      model,
    });
  }

  async summarizeText(text: string, maxLength: number = 200) {
    return this.api.post('/assistant/summarize', {
      text,
      max_length: maxLength,
    });
  }

  async extractKeyPoints(text: string) {
    return this.api.post('/assistant/extract-points', {
      text,
    });
  }

  async generateStudyPlan(courses: any[], preferences: any) {
    return this.api.post('/assistant/study-plan', {
      courses,
      preferences,
    });
  }
}

export default new ApiService();
