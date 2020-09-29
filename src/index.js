import React,{useEffect, useState} from 'react';
import {SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';

import api from '../services/api';

export default function App(){
  const [projects, setProjects] = useState([]);
 
  useEffect(()=>{
    api.get('projects').then(response => {
      console.log(response.data)
      setProjects(response.data);  
    })
  }, []);

  async function handdleAddProject() {
    const response = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: 'japavey 2'
    })
    
    const project = response.data;

    setProjects([...projects,project ]);
  }

  return(
    <>
      <StatusBar barStyle="light-content" backgroundColor="#760f2d" />
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={projects}
          keyExtractor={project => project.id} 
          renderItem = {({ item: project })=>( 
            <Text style={styles.project}>
              {project.title}
            </Text>
          )}
        /> 
        <TouchableOpacity 
          activeOpacity={0.6} 
          style={styles.button} 
          onPress={handdleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#760f2d'
    },
    project: {
        color: "#fff",
        fontSize: 26
    },
    button: {
      backgroundColor: '#fff',
      margin: 20,
      height: 50,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonText: {
      fontWeight: 'bold',
      fontSize: 16
    }
});