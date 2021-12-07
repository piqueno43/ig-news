import { Children } from "react";
import { ReactElement, cloneElement } from "react";
import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";


interface ActiveLinkProps extends LinkProps{  
  children: ReactElement;
  
}
export function ActiveLink({children, ...props}: ActiveLinkProps) {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || '';

  const className = 
    asPath === props.href 
    || asPath === props.as
    || props.passHref && asPath.startsWith('/posts')
      ? `${childClassName} active-menu`.trim()
      : childClassName;
  
  return (
    <Link {...props}>
      {cloneElement(child, { 
        className
      })}
    </Link>
  );
}