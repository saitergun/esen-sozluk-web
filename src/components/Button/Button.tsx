import classNames from 'classnames'
import { forwardRef } from 'react'

type ButtonProps = {
  children?: React.ReactNode
  text?: string
  primary?: boolean
  secondary?: boolean
  onClick?: () => void
}

type Props = React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLButtonElement>
>

const Button: Props = forwardRef(
  ({ children, text, primary, secondary, onClick }, ref) => (
    <button
      type="button"
      className={classNames(
        'text-center font-600 text-alternative-900 rounded-sm py-1.5 px-4 select-none focus:relative focus:outline-none focus:z-1 focus:ring-2 focus:ring-offset-4',
        {
          'focus:ring-alternative-400': !primary && !secondary,
          'focus:ring-primary-600 active:bg-primary-600 bg-primary text-white':
            primary,
          'focus:ring-secondary-700 active:bg-secondary bg-secondary-400 text-alternative-400':
            secondary,
        },
      )}
      onClick={onClick}
      ref={ref}
    >
      {text ?? children}
    </button>
  ),
)

Button.displayName = 'Button'

export default Button
