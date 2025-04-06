import { render, screen, fireEvent } from '@testing-library/react';
import { ShareMenu } from '../share-menu';

// Mock child components
jest.mock('../ShareOptions', () => {
  return function MockShareOptions({ isOpen }: { isOpen: boolean }) {
    return (
      <div 
        data-testid="share-options" 
        style={{ 
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      >
        Share Options
      </div>
    );
  };
});

// Mock the toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe('ShareMenu', () => {
  const mockQuote = {
    content: 'Test quote content',
    author: 'Test Author',
    tags: ['test'],
  };

  const mockCurrentScheme = {
    background: '#ffffff',
    text: '#000000',
  };

  const defaultProps = {
    quote: mockQuote,
    currentScheme: mockCurrentScheme,
    onDownload: jest.fn(),
    isGeneratingImage: false,
    showCopiedMessage: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the share button', () => {
    render(<ShareMenu {...defaultProps} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('disables share button when isGeneratingImage is true', () => {
    render(<ShareMenu {...defaultProps} isGeneratingImage={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('toggles share options menu when share button is clicked', () => {
    render(<ShareMenu {...defaultProps} />);
    const shareButton = screen.getByRole('button');
    
    // Initially, ShareOptions should be closed
    expect(screen.getByTestId('share-options')).toHaveStyle({ opacity: 0 });
    
    // Click to open
    fireEvent.click(shareButton);
    expect(screen.getByTestId('share-options')).toHaveStyle({ opacity: 1 });
    
    // Click to close
    fireEvent.click(shareButton);
    expect(screen.getByTestId('share-options')).toHaveStyle({ opacity: 0 });
  });

  it('closes share options menu when clicking outside', () => {
    render(
      <div>
        <ShareMenu {...defaultProps} />
        <div data-testid="outside">Outside</div>
      </div>
    );
    
    // Open the menu
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('share-options')).toHaveStyle({ opacity: 1 });
    
    // Click outside
    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.getByTestId('share-options')).toHaveStyle({ opacity: 0 });
  });
}); 