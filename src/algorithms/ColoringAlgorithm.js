const COLORS = ["#ff7c8b", "#8bdbf0","#ffe599", "#a3d58a", "#b882c3", "#a668a4"]; //* red, blue, yellow, green, pink, purple

export const coloringGraph = (nodes, edges) => {
   let grades = [];
   for (let index = 0; index < nodes.length; index++) {
      const node = nodes[index];
      
      let nodeEdges = [];
      edges.forEach(x => {
         if(x.end === index) {
            nodeEdges.push(x.start);
         }
         
         if(x.start === index) {
            nodeEdges.push(x.end);
         }
      });

      grades.push({
         index,
         edges: nodeEdges
      })
   }

   if(nodes[grades[0]?.index])
      nodes[grades[0]?.index].color = COLORS[0];

   grades.splice(0, 1);

   let colorIndex = 0;
   while(colorIndex < COLORS.length || grades.length > 0) {
      let i = 0;
      while(i < grades.length) {
         let flag = true;

         flag = grades[i]?.edges.some(edge => nodes[edge].color == COLORS[colorIndex]);
         
         if(!flag) {
            if(nodes[grades[i]?.index])
               nodes[grades[i]?.index].color = COLORS[colorIndex];

            grades.splice(i, 1);
         }

         i++;
      }
      colorIndex++;
   }
}
