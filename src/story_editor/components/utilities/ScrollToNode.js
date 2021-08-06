import * as Scroll from 'react-scroll';

const scrollToNode = (nodeId) => {
    
    const scroller = Scroll.scroller;
    scroller.scrollTo(nodeId, {
        duration: 500,
        delay: 50,
        smooth: true
    });
}

export default scrollToNode;