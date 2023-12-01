/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.desertificationback.Control;

import com.mycompany.desertificationback.Models.conversacion;
import java.util.ArrayList;
import BD.conversacionDAO;

/**
 *
 * @author leona
 */
public class listaConversaciones {
    ArrayList<conversacion> conversaciones = new ArrayList<>();
    
    public static ArrayList<conversacion> extraer(){
        return conversacionDAO.obtenerConversaciones();
    };
}
