import React from 'react';

type TSvgSelectorProps = {
  id: string;
  className?: string;
  style?: Record<string, string>;
};

type TSvgMapItem = Record<string, JSX.Element>;

const SvgSelector: React.FC<TSvgSelectorProps> = ({ id, className, style }) => {
  const svgMap: TSvgMapItem = {
    placeholder: (
      <svg className={className} style={style} viewBox="0 0 249.99 199.99">
        <g>
          <rect
            x="9"
            y="9"
            width="232"
            height="182"
            rx="17.99"
            fill="none"
            strokeMiterlimit="10"
            strokeWidth="17.99"
          />
          <polygon points="35 165 35 140.64 75.47 100.17 95.64 120.35 161 55 214.5 108.5 214.5 165 35 165" />
          <path
            d="M83,84c-.54,31.55-47.47,31.54-48,0C35.54,52.45,82.47,52.46,83,84Z"
            transform="translate(0 -25)"
          />
        </g>
      </svg>
    ),
    'checkbox-checked': (
      <svg className={className} style={style} viewBox="0 0 400 400">
        <circle
          cx="200"
          cy="200"
          r="190"
          fill="none"
          stroke="#77c0af"
          strokeMiterlimit="10"
          strokeWidth="15"
        />
        <polyline
          points="290 107 170 293 103 224"
          fill="none"
          stroke="#77c0af"
          strokeMiterlimit="10"
          strokeWidth="28"
        />
      </svg>
    ),
    'checkbox-unchecked': (
      <svg className={className} style={style} viewBox="0 0 400 400">
        <circle
          cx="200"
          cy="200"
          r="190"
          fill="none"
          stroke="#e6e6e6"
          strokeMiterlimit="10"
          strokeWidth="15"
        />
      </svg>
    ),
  };

  if (!svgMap.hasOwnProperty(id)) {
    console.warn(`Svg with id "${id}" doesn't exist`);
    return svgMap.placeholder;
  }

  return svgMap[id];
};

export default React.memo(SvgSelector);
