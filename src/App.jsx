import { useState, useCallback, useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import "./App.css";

const App = () => {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@$%^^&&**()&";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99999);
    document.execCommand("copy");
  }, [password]);

  const passwordAnimation = useSpring({
    opacity: password ? 1 : 0,
    transform: password ? "translateY(0)" : "translateY(-20px)",
  });

  const copyButtonAnimation = useSpring({
    opacity: password ? 1 : 0,
    transform: password ? "translateY(0)" : "translateY(20px)",
  });

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-6 py-8 text-white bg-gray-800 border border-gray-700">
        <h1 className="text-3xl font-semibold text-center mb-6">
          SecurePass Generator
        </h1>
        <div className="relative">
          <animated.input
            type="text"
            value={password}
            className="w-full py-3 px-4 rounded outline-none bg-gray-900 text-white text-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
            style={passwordAnimation}
          />
          <animated.button
            onClick={copyPasswordToClipboard}
            className="absolute right-0 top-0 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-l-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={copyButtonAnimation}
          >
            Copy
          </animated.button>
        </div>
        <div className="flex items-center text-sm mt-6 space-x-4">
          <div className="flex items-center">
            <label className="text-white mr-2">Length:</label>
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <span className="text-white ml-2">{length}</span>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" className="text-white ml-2">
              Numbers
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput" className="text-white ml-2">
              Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
