import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

// Mock de useNavigate de react-router-dom
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  BrowserRouter: ({ children }) => <div>{children}</div>, // Mock BrowserRouter
}));


test('renders login form with username and password fields', () => {
  render(<Login />);

  // Vérifiez si les champs de saisie pour le nom d'utilisateur et le mot de passe sont présents
  const usernameInput = screen.getByPlaceholderText(/Entrez votre nom/i);
  const passwordInput = screen.getByPlaceholderText(/Mot de passe/i);

  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test('calls navigate on successful login', async () => {
  render(<Login />);

  const usernameInput = screen.getByPlaceholderText(/Entrez votre nom/i);
  const passwordInput = screen.getByPlaceholderText(/Mot de passe/i);
  const loginButton = screen.getByRole('button', { name: /Se connecter/i });

  fireEvent.change(usernameInput, { target: { value: 'validUser' } });
  fireEvent.change(passwordInput, { target: { value: 'validPassword' } });

  // Simuler la soumission du formulaire
  fireEvent.click(loginButton);

  // Vérifier que useNavigate a été appelé après une connexion réussie
  const { useNavigate } = require('react-router-dom');
  expect(useNavigate).toHaveBeenCalledWith('/dashboard');  // Vérifier que la navigation se fait vers /dashboard
});
