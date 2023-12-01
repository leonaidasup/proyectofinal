/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package BD;

/**
 *
 * @author leo
 */

import com.mycompany.desertificationback.Models.conversacion;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

public class conversacionDAO {
    static PreparedStatement ps = null;
    static ResultSet rs = null;
    static Connection conn = null;
    static BD conexion = null;
    public static void agregar(conversacion p) {
        try {
            conn = conexion.getConexion();
            String query = "INSERT INTO userdb (`id`, `user`, `title`, `content`) VALUES (?, ?, ?, ?)";
            System.out.println("sadas");
            ps = conn.prepareStatement(query);
            ps.setString(1, p.getId() + "");
            ps.setString(2, p.getUser());
            ps.setString(3, p.getTitle());
            ps.setString(4, p.getContent());
            ps.executeUpdate(); 
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                rs.close();
            } catch (Exception e) {}
        }
    }
    public static boolean eliminar(conversacion p) {
        try {
            conn = BD.getConexion();
            String query = "DELETE FROM userdb WHERE id=?";
            ps = conn.prepareStatement(query);
            ps.setString(1, p.getId() + "");
            return ps.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                rs.close();
            } catch (Exception e) {}
        }
        return false;
    }
    public static ArrayList<conversacion> obtenerConversaciones() {
        ArrayList<conversacion> conversaciones = new ArrayList<>();
        try {
            conn = BD.getConexion();
            String query = "SELECT * FROM userdb";
            ps = conn.prepareStatement(query);
            rs = ps.executeQuery();
            while (rs.next()) {
                conversaciones.add(new conversacion(rs.getInt("id"), rs.getString("user"), rs.getString("title"), rs.getString("content")));
                }
        } catch (Exception e) {
            System.out.println(e);
        }
        return conversaciones;
    }
}
