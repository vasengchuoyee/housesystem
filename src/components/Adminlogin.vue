<script>
import { authService } from '@/services/auth';

export default {
  // ...existing component configuration...

  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/api/admin/login', {
          email: this.email,
          password: this.password
        });

        if (response.data?.token) {
          // Store clean token
          authService.setToken(response.data.token);
          console.log('Token stored:', authService.getToken());
          this.$router.push('/admin');
        }
      } catch (error) {
        console.error('Login failed:', error);
        this.error = 'Invalid credentials';
      }
    }
  }
};
</script>
