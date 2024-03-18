import React, { useRef, useEffect, useState } from 'react';
import p5 from 'p5';

const SubSetComponent = ({ set, target }) => {
   const [visited, setVisited] = useState(false);
   const canvasRef = useRef(null);

   function getSubsetsWithSum(set, n, sum) {
      // Base Cases
      if (sum === 0) {
        return [[]]; // Empty subset
      }
      if (n === 0) {
        return []; // No subsets
      }
    
      // Create a list to store all possible subsets
      let subsets = [];
    
      // If last element is greater than sum, exclude it
      if (set[n - 1] > sum) {
        subsets = getSubsetsWithSum(set, n - 1, sum);
      } else {
        // Include the last element
        const includedSubsets = getSubsetsWithSum(set, n - 1, sum - set[n - 1]);
        for (let subset of includedSubsets) {
          subset.push(set[n - 1]);
          subsets.push(subset);
        }
    
        // Exclude the last element
        const excludedSubsets = getSubsetsWithSum(set, n - 1, sum);
        subsets.push(...excludedSubsets);
      }
    
      return subsets;
   }

   const sketch = (p) => {

      // let set = [3, 34, 4, 12, 5, 2];
      // let sum = 9;

      p.setup = () => {
         p.createCanvas(400, 400);
         p.background("#191f2b");
         p.textSize(16);
         p.textAlign(p.LEFT, p.CENTER);
      }

      p.draw = () => {
         // Display original set and target sum
         p.strokeWeight(.5);
         p.textSize(27);
         if(set.length > 0) {
            p.fill("#ffe599")
            p.text(`Set: ${set.join(", ")}`, 25, 30);
         }

         if(target) {
            p.fill("#a3d58a")
            p.text(`Objetivo: ${target}`, 25, 60);
         }

         p.textSize(20);
         drawSubsets(p);
      }

      const drawSubsets = (p) => {
         let subsets = getSubsetsWithSum(set, set.length, target);
         
         if(subsets.length > 0) {
            p.fill("#a3d58a")
            p.text(`Subconjuntos encontrados: ${subsets.length}`, 35, 100);

            let initialPosition = 125;
            p.fill("#d3cdc1");
            subsets.forEach((subset, index) => {
               p.text(`Subconjunto ${index}: ${subset.join(", ")}`, 50, initialPosition);
               initialPosition += 20;
            });
         }
         
         if(subsets == 0 && visited) {
            p.fill("#ff7c8b")
            p.text(`No se encontraron subconjuntos`, 35, 100);
         }
      
         
      }
   };

   useEffect(() => {
      let myP5 = new p5(sketch, canvasRef.current);
      
      setVisited(true);
      return () => {
         // Cleanup
         myP5.remove();
      };
   }, [set, target]);

   return <div ref={canvasRef} style={{ width: '100%', height: '100vh' }}></div>;
};

export default SubSetComponent;


