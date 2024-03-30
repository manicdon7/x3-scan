import React, { useState } from 'react';

const Play = () => {
  const [x3Code, setX3Code] = useState('');
  const [solidityCode, setSolidityCode] = useState('');

  const handleConvert = () => {
    // Code for converting X3 to Solidity goes here
    // Placeholder conversion for demonstration
    setSolidityCode(`// Converted from X3 to Solidity\n${x3Code}`);
  };

  const syntaxHighlight = (code) => {
    const keywords = ["abstract", "after", "alias", "anonymous", "as", "assembly", "assert", "auto", "before", "begin", "case", "catch", "constant", "constructor", "continue", "contract", "debugger", "default", "delegatecall", "delete", "deprecated", "do", "else", "emit", "enum", "error", "event", "external", "fallback", "final", "finally", "fixed", "for", "from", "function", "get", "hex", "if", "implements", "import", "in", "indexed", "inherit", "inline", "interface", "internal", "is", "library", "lock", "mapping", "memory", "modifier", "new", "of", "on", "override", "pack", "pragma", "private", "protected", "public", "pure", "receive", "reentrant", "ref", "rem", "remove", "revert", "returns", "sealed", "selector", "selfdestruct", "short", "signed", "sizeof", "stack", "static", "stop", "storage", "struct", "suicide", "super", "switch", "this", "throw", "to", "try", "type", "unchecked", "uninitialized", "unsigned", "using", "var", "view", "virtual", "visible", "volatile", "while", "with", "xor"];
    return code.split('\n').map((line, index) => {
      let highlightedLine = line;
      keywords.forEach(keyword => {
        highlightedLine = highlightedLine.replace(new RegExp(keyword, 'g'), `<span class="text-blue-500 font-bold">${keyword}</span>`);
      });
      return (
        <div key={index}>
          <span className="text-gray-500 pr-2">{index + 1}</span>
          <span dangerouslySetInnerHTML={{ __html: highlightedLine }}></span>
        </div>
      );
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-2 gap-8">
        {/* X3 Code Editor */}
        <div className="relative">
          <h2 className="text-lg font-bold mb-4">X3 Code</h2>
          <div className="absolute left-0 top-0 h-full px-2 pt-2 mt-10 flex flex-col justify-start text-right">
            {x3Code.split('\n').map((_, index) => <span key={index} className="text-gray-500">{index + 1}</span>)}
          </div>
          <textarea
            className="w-full h-64 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 pl-12"
            value={x3Code}
            onChange={(e) => setX3Code(e.target.value)}
            placeholder="Write your X3 code here..."
          ></textarea>
        </div>

        {/* Solidity Code Output */}
        <div>
          <h2 className="text-lg font-bold mb-4">Solidity Code</h2>
          <div className="overflow-auto w-full h-64 border border-gray-300 rounded px-4 py-2">
            {syntaxHighlight(solidityCode)}
          </div>
        </div>
      </div>

      {/* Convert Button */}
      <div className="mt-8 flex justify-center">
        <button
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 focus:outline-none"
          onClick={handleConvert}
        >
          Convert
        </button>
      </div>
    </div>
  );
};

export default Play;
