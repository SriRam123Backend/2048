package Service;

import java.util.Arrays;

public class logic {
  
  int row = 4;
  int column = 4;
  int score = 0;
  int[][] box_Values = new int[row][column];
  
  private static logic Logic = null;
  
  private logic(){
	  
  }
  
  public static logic getInstance()
  {
		if(Logic==null) {
			Logic = new logic();
		}
		return Logic;
  }
  public int[][] createBoard()
  {
     for(int i=0;i<row;i++)
     {
    	 for(int j=0;j<column;j++)
    	 {
    		 box_Values[i][j] = 0;
    	 }
     }
     
     score = 0;
     return box_Values;
  }
  
  public int[][] insertingNewValues()
  {
	  if(!Logic.isEmpty())
	  {
		  return null;
	  }
	  
	  boolean is_Insert = false;
	  
	  while(!is_Insert)
	  {
		  int RandomRowNumber = (int) Math.floor(Math.random()*row);
		  int RandomColumnNumber = (int) Math.floor(Math.random()*column);
		  
		  if(box_Values[RandomRowNumber][RandomColumnNumber] == 0)
		  {
			  box_Values[RandomRowNumber][RandomColumnNumber] = 2;
			  is_Insert = true;
		  }
	  }
	  
	  return box_Values;
  }
  
   public int[][] goLeft(){
	    for(int i=0; i<row; i++){
	        int[] row = box_Values[i];
	        row = movement(row);
	        box_Values[i]=row;
	    }
	    return box_Values;
	}
   
   public int[][] goRight(){
	    for(int i=0; i<row; i++){
	        int[] row = box_Values[i];
	        row = Logic.reverse(row);
	        row = movement(row);
	        row = Logic.reverse(row);
	        box_Values[i]=row;
	    }
	    return box_Values;
	}
   
   public int[][] goTop(){
	    for(int i=0; i<column; i++){
            int[] row= {box_Values[0][i],box_Values[1][i],box_Values[2][i],box_Values[3][i]};
            row = movement(row);
            box_Values[0][i]=row[0];
            box_Values[1][i]=row[1];
            box_Values[2][i]=row[2];
            box_Values[3][i]=row[3];
    }
    return box_Values;
	}
   
   public int[][] goDown(){
	    for(int i=0; i<column; i++){
	            int[] row= {box_Values[0][i],box_Values[1][i],box_Values[2][i],box_Values[3][i]};
	            row = Logic.reverse(row);
	            row = movement(row);
	            row = Logic.reverse(row);
	            box_Values[0][i]=row[0];
	            box_Values[1][i]=row[1];
	            box_Values[2][i]=row[2];
	            box_Values[3][i]=row[3];
	    }
	    return box_Values;
	}
  
  public int[] movement(int[] row)
  {
	  row = Logic.swaping(row);
	  for(int i=0;i<row.length-1;i++)
	  {
		  if(row[i]==row[i+1] && row[i]!=0)
		  {
			  row[i] = row[i]*2;
			  row[i+1] = 0;
			  score += row[i];
			  this.setScore(score);
		  }
	  }
	  row = swaping(row);
	  return row;
  }
  
  public int[] reverse(int[] array)
  {
	  int[] result = new int[array.length];
	  int count = 0;
	  for(int i=array.length-1;i>=0;i--)
	  {
		  result[count] = array[i];
		  count++;
	  }
	  
	  return result;
  }
  public boolean isEmpty(){
	  
	  for(int i=0; i<row; i++){
	     for(int j=0; j<column; j++){
	           if(box_Values[i][j]==0){
	               return true;
	          }
	       }
	   }
	    return false;
  }
  
  public int[] swaping(int[] array)
  {	  
	  int new_arr[] = new int[array.length];
	  Arrays.fill(new_arr, 0); 
	  int index = 0;
	  for(int i = 0;i < array.length; i++) {
		  if(array[i] != 0) {
			  new_arr[index++] = array[i];
		  }
	  }
	  return new_arr;
  }
  
  public boolean isOver(){
	    for(int i=0; i<row; i++){
	        for(int j=0; j<column; j++){
	            if(box_Values[i][j]==0){
	                return false;
	            }
	        }
	    }
	    for(int i=0; i<row-1; i++){
	        for(int j=0; j<column-1; j++){
	            if(i!=3 || j!=3){
	                if(box_Values[i][j]!=0 && ((box_Values[i][j]==box_Values[i+1][j]) || (box_Values[i][j]==box_Values[i][j+1]) || (box_Values[0][3]==box_Values[1][3]) || (box_Values[1][3]==box_Values[2][3]) || (box_Values[2][3]==box_Values[3][3]) || (box_Values[3][0]==box_Values[3][1]) || (box_Values[3][1]==box_Values[3][2]) || (box_Values[3][2]==box_Values[3][3]))){
	                    return false;
	                }
	            }
	        }
	    }
	   return true;
	}

public int getScore() {
	return score;
}

public void setScore(int score) {
	this.score = score;
}

}
