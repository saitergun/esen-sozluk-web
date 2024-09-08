import classNames from 'classnames'

type Props = {
  children: React.ReactNode
  small?: boolean
  ariaLabel?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function IconButton({
  children,
  small,
  ariaLabel,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={classNames([
        'flex items-center justify-center text-24/16 w-10 h-10 rounded-full',
        'hover:bg-opacity-5 hover:bg-black',
        'focus:bg-opacity-5 focus:bg-black focus:outline-none',
        'active:bg-opacity-10 focus:bg-black',
        {
          'w-7 h-7': small,
        },
      ])}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
