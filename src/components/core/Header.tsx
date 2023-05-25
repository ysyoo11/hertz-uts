import Logo from './Logo';

interface Props {
  className?: string;
}

export default function Header({ className }: Props) {
  return (
    <header className='py-2 px-4'>
      <Logo />
    </header>
  );
}
