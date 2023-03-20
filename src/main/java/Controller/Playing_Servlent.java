package Controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import Service.logic;

/**
 * Servlet implementation class Playing_Servlent
 */
@WebServlet("/Playing_Servlent")
public class Playing_Servlent extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public Playing_Servlent() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@SuppressWarnings("unchecked")
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
      JSONObject initialize = new JSONObject();
      
      int[][] values = logic.getInstance().createBoard();
      
      JSONArray jsonArray = new JSONArray();

      for (int[] row : values) {
          JSONArray rowArray = new JSONArray();
          for (int num : row) {
              rowArray.add(num);
          }
          jsonArray.add(rowArray);
      }

      String json = jsonArray.toString();
      
      initialize.put("initialValues",json);
      initialize.put("rows",4);
      initialize.put("columns",4);
      initialize.put("score",0);
      
      response.getWriter().append(initialize.toString());
      
	}

}
