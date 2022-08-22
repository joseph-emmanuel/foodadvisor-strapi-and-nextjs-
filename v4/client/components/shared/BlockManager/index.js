import Hero from "../../blocks/Hero";
import Pricing from "../../blocks/Pricing";
import CtaCommandLine from "../../blocks/CtaCommandLine";

const getBlockComponent = ({ __component, ...rest }, index) => {
  console.log("my component is : ", __component);
  let Block;

  switch (__component) {
    case "blocks.hero":
      Block = Hero;
      break;
    case "blocks.pricing":
      Block = Pricing;
      break;
    case "blocks.cta-command-line":
      Block = CtaCommandLine;
      break;
  }

  return Block ? <Block key={`index-${index}`} {...rest} /> : null;
};

const BlockManager = ({ blocks }) => {
  return <div>{blocks.map(getBlockComponent)}</div>;
};

BlockManager.defaultProps = {
  blocks: [],
};

export default BlockManager;
