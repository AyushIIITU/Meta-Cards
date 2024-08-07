function greetingCard() {
  return (
    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
      <svg
        fill="#000000"
        height="800px"
        width="800px"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256.986 256.986"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        enableBackground="new 0 0 256.986 256.986"
      >
        <path d="m184.931,66.642v-66.642l-136.875,41.438v7.209l-.626-.082v187.106l162.127,21.314v-187.105l-24.626-3.238zm-30-26.214v22.271l-51.291-6.743 51.291-15.528zm7.509,120.818c-5.704,8.673-35.577,29.297-35.577,29.297s-29.986-20.699-35.651-29.297c-2.836-4.304-4.85-9.055-4.516-15.299 0.592-11.053 9.629-20.179 20.697-20.179 11.378,0 18.004,12.14 19.434,12.14 1.633,0 8.543-12.14 19.434-12.14 11.067,0 20.104,9.127 20.696,20.179 0.333,6.244-1.673,10.976-4.517,15.299z" />
      </svg>
    </div>
  );
}

export default greetingCard;
