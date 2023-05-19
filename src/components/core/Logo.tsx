import clsx from 'clsx';

interface Props {
  className?: string;
  size?: 'sm' | 'base';
}

export default function Logo({ className, size = 'base' }: Props) {
  return (
    <svg
      className={clsx(className, {
        'w-16': size === 'sm',
        'w-20': size === 'base',
      })}
      version='1.1'
      id='Layer_2'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      x='0px'
      y='0px'
      viewBox='0 0 464.7 172.1'
      enableBackground='new 0 0 464.7 172.1'
      xmlSpace='preserve'
    >
      <g>
        <path
          fill='#231F20'
          d='M18.6,134.8H47l9.2-48.3l28.2-27.4c8.8-8.6,14.8-15.6,18.1-21.2c3.2-5.5,5.9-13.7,7.9-24.4L113.1,0H84.3
		l-2.7,13.4c-1.4,7.7-3.2,13.6-5.3,17.6C74,35,70,39.9,64.3,45.7L46.7,63.4L35.5,45.7C32,39.9,30,35,29.4,30.8
		c-0.6-4.2-0.1-10,1.5-17.4L33.5,0H4.7L2,13.5C0,24.4-0.5,32.6,0.5,38.1c1,5.5,4.3,12.5,9.8,21.1l17.5,27.4L18.6,134.8z'
        />
        <path
          fill='#231F20'
          d='M96,73.2l-4.6,23c-2.4,12.7-0.1,22.7,7.1,30c7.2,7.3,18.9,10.9,35.3,10.9c15.3,0,29.9-4,43.8-12.1
		l-5.9-17.4c-12.1,6.6-23.1,9.9-32.8,9.9c-7.3,0-12.7-1.7-16.3-5c-3.5-3.4-4.5-9.2-2.8-17.5l0.4-2.4h65.3l3.8-19.4
		c2.3-11.7,0-21.4-6.9-29c-6.9-7.6-17.5-11.4-31.9-11.4c-14.4,0-26.5,3.8-36.3,11.5C104.4,51.9,98.3,61.6,96,73.2z M123.5,75.9
		c1.4-7.7,4.1-13.5,8.1-17.4c4-3.9,9-5.8,14.9-5.8s10.1,1.9,12.7,5.7c2.6,3.8,3.1,9.5,1.5,17.1l-0.2,1.2h-37.3L123.5,75.9z'
        />
        <path
          fill='#231F20'
          d='M232.3,76.7c1.6-7.8,4.3-13.6,8.3-17.3S250,54,257.1,54c7.3,0,15.3,2.5,23.8,7.5l13.1-18.7
		c-9.3-6.6-20.1-10-32.6-10c-16.1,0-29,3.7-38.6,11.1c-9.6,7.4-15.6,17.2-17.9,29.3l-11.9,61.6h28.1L232.3,76.7z'
        />
        <path
          fill='#231F20'
          d='M292.8,128.8c5.6,5.6,14.2,8.4,25.9,8.4c11.4-0.1,22.7-2.9,34-8.6l-6.5-18.8c-7.9,4.1-14.5,6.1-19.6,6.1
		c-3.7,0-6.6-1.1-8.7-3.2c-2.1-2.1-2.8-5.2-2.1-9.1l9.3-47.4h34.2l4-21.2h-34.2l5.7-32.6l-28.1-1L301,35.1l-4,21.2l-9.7,49.6
		C285.4,115.5,287.2,123.2,292.8,128.8z'
        />
        <path
          fill='#231F20'
          d='M380.5,35.1l-3.7,19.5H433l-0.4,1.1c-0.5,2.6-1.6,4.7-3.2,6.4c-1.7,1.7-4.9,3.9-9.6,6.8l-36.5,21.9
		c-6.8,3.9-11.8,7.8-14.8,11.7c-3.1,3.8-5.1,8.7-6.1,14.6l-3.5,17.9h86.6l5.7-19.5h-60.5l0.2-0.9c0.5-2.6,1.5-4.8,3.1-6.6
		c1.6-1.8,4.5-4.1,8.8-6.6L437,79.9c8.7-5.1,14.6-9.5,17.8-13.2c3.2-3.6,5.3-8.1,6.4-13.5l3.5-18.1H380.5z'
        />
        <polygon
          fill='#FFD100'
          points='10.7,172.1 436.7,172.1 442.7,149.2 15.7,149.2 	'
        />
      </g>
    </svg>
  );
}
