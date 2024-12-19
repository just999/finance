import { cn } from '@/lib/utils';
import React from 'react';
type IconProps = {
  className?: string;
};

function Ovo({ className }: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width='100'
      height='72'
      className={cn('w-6 h-auto', className)}
      fill='none'
      viewBox='0 0 100 72'
    >
      <path fill='url(#pattern0_0_3)' d='M0 0H645V392H0z'></path>
      <defs>
        <pattern
          id='pattern0_0_3'
          width='1'
          height='1'
          patternContentUnits='objectBoundingBox'
        >
          <use transform='scale(.00155 .00255)' xlinkHref='#image0_0_3'></use>
        </pattern>
        <image
          id='image0_0_3'
          width='100'
          height='72'
          xlinkHref='data:image/jpeg;base64,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PSTd/wCBGcQWUybqGa012io1/wAHFQb6oAPrUlRqT5akTvOfH7sGRQQRyVQARGg1ZEfG/ioNHo1ogVBA9zToiesCrd/RxWuWg62dMlSAPU07LnOf+kB//9oADAMBAAIAAwAAABAkHX333333333333333333333333333333333m3Un0mH3333333333333333333333233133333330mkUEEGGEHHHGHH33X33333332n3322333333331X3l1030X0EGF333n31X33333322n33333333333V1X0Gm1U0V0UkFHEEHHHHHHHHHHHGHHHHHHHHHHHHHFHGnX1X1X0W0EEEEGFFHHHGFFGEGFHFHEFGEHGHEFEHGn33X1X1XUEEEEEEUUUEEEUEEEEEkEEEEEEEEkEUEWl3201X1XUEEEEE8tEEEGEEkkEEGE0EEEEWsOkFEFWnX3H1X1G0EEFo77zx4AEH/AP8AwARf/wDgEHP1yx2s0EWl31X1X1X0kFZ7rrPzz2k/nzsgFH3yUFTz0vHGzsFGn33XFX0F0EXf4AlUWHRoGrywmkGWyPZzye2kvP4rev31X1X1X0EbyQEEEGH2ilFW4gFLyAEzyIEEEGHxVOn1331X0U0FbwMGHFHHawnEXwuF7wAF3qlGGGkL6xWl2001X1HWELRwEkUUnW4EUfftVzKUlzwoUkk1Dxw+v31U1X0X0FF36qFFHryYHFGvyTwNGGfzhHGHEbjBWn3V31X1HEEPfym0pV7x4E0UBbzkUUEPm5Rhzzy6EWnXnHFX1X0kEHPHzzzsAEEEEHLx9EEEFPzzzz74MFGn33XFX0l0EEEGPySY330FlWkGiG1Gkn3kyqj0FUHWn31330UEEEEUEEkEF03kEF10WkW0m02100k20V0F0Gn0020FEGHFVWHlEH33mEH31WlX2n33332n31X0H0Gn1320UkUEEEEE00X030kl00200mm2m000k0010k2k10031GFEEEEEFFGHXH3GHWVHlGmHmHmXGFHlHWHWHn3HHlEUEk1UUm0UH320kH31WlX2n33332n31X0H0Gn3X3kEEEEFFEGEEH3G0EHXFGlHGnnnnHGHHFHUHEmHXHH12F0EEEEH313332GH33332GH2H332H3332H2H3333/8QAHxEBAAICAwADAQAAAAAAAAAAARARACAh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'
        ></image>
      </defs>
    </svg>
  );
}

export default Ovo;
