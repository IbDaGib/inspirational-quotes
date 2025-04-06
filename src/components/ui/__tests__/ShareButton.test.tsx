import { render, screen, fireEvent } from '@testing-library/react';
import ShareButton from '../ShareButton';

describe('ShareButton', () => {
  const mockCurrentScheme = {
    background: '#ffffff',
    text: '#000000',
  };

  const defaultProps = {
    onClick: jest.fn(),
    icon: <span>Icon</span>,
    delay: '0ms',
    isOpen: true,
    currentScheme: mockCurrentScheme,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with the provided icon', () => {
    render(<ShareButton {...defaultProps} />);
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    render(<ShareButton {...defaultProps} />);
    fireEvent.click(screen.getByRole('button'));
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('applies correct styles when open', () => {
    render(<ShareButton {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('opacity-100');
    expect(button).not.toHaveClass('opacity-0');
  });

  it('applies correct styles when closed', () => {
    render(<ShareButton {...defaultProps} isOpen={false} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('opacity-0');
    expect(button).not.toHaveClass('opacity-100');
  });

  it('applies transition delay from props', () => {
    render(<ShareButton {...defaultProps} delay="100ms" />);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ transitionDelay: '100ms' });
  });

  it('applies color scheme styles correctly', () => {
    const scheme = {
      text: '#ff0000',
      background: '#ffffff',
    };
    render(<ShareButton {...defaultProps} currentScheme={scheme} />);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      backgroundColor: `${scheme.text}20`,
      border: `1px solid ${scheme.text}`,
      color: scheme.text,
    });
  });
}); 