import { render, screen, fireEvent } from '@testing-library/react';
import ShareOptions from '../ShareOptions';

// Mock child components
jest.mock('../ShareButton', () => {
  return function MockShareButton({ onClick, icon }: { onClick: () => void; icon: React.ReactNode }) {
    return (
      <button onClick={onClick} data-testid="share-button">
        {icon}
      </button>
    );
  };
});

describe('ShareOptions', () => {
  const mockCurrentScheme = {
    background: '#ffffff',
    text: '#000000',
  };

  const defaultProps = {
    isOpen: true,
    currentScheme: mockCurrentScheme,
    handleDownload: jest.fn(),
    handleTwitterShare: jest.fn(),
    handleLinkedInShare: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all share buttons', () => {
    render(<ShareOptions {...defaultProps} />);
    const buttons = screen.getAllByTestId('share-button');
    expect(buttons).toHaveLength(3); // Download, Twitter, LinkedIn
  });

  it('calls handleDownload when download button is clicked', () => {
    render(<ShareOptions {...defaultProps} />);
    const buttons = screen.getAllByTestId('share-button');
    fireEvent.click(buttons[0]); // Download button is first
    expect(defaultProps.handleDownload).toHaveBeenCalled();
  });

  it('calls handleTwitterShare when Twitter button is clicked', () => {
    render(<ShareOptions {...defaultProps} />);
    const buttons = screen.getAllByTestId('share-button');
    fireEvent.click(buttons[1]); // Twitter button is second
    expect(defaultProps.handleTwitterShare).toHaveBeenCalled();
  });

  it('calls handleLinkedInShare when LinkedIn button is clicked', () => {
    render(<ShareOptions {...defaultProps} />);
    const buttons = screen.getAllByTestId('share-button');
    fireEvent.click(buttons[2]); // LinkedIn button is third
    expect(defaultProps.handleLinkedInShare).toHaveBeenCalled();
  });

  it('applies correct styles when menu is closed', () => {
    render(<ShareOptions {...defaultProps} isOpen={false} />);
    const menu = screen.getByRole('list');
    expect(menu).toHaveClass('opacity-0');
    expect(menu).toHaveClass('pointer-events-none');
    expect(menu).toHaveClass('scale-75');
  });

  it('applies correct styles when menu is open', () => {
    render(<ShareOptions {...defaultProps} isOpen={true} />);
    const menu = screen.getByRole('list');
    expect(menu).toHaveClass('opacity-100');
    expect(menu).toHaveClass('pointer-events-auto');
    expect(menu).toHaveClass('scale-100');
  });
}); 