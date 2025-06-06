import React from 'react'
import { View, StyleSheet } from 'react-native'
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Button, Card, IconButton, Paragraph, Text, Title } from 'react-native-paper'

export const BookItem = ({ title, publisher } : { title: string, publisher: string }) => {
  return (
    <>
    <Card mode='elevated' style={styles.card}>
      <View style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
      <View>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Title style={styles.cardHeader}>{title}</Title>
        </View>
        <Paragraph style={styles.authorText}>by {publisher}</Paragraph>
      </Card.Content>
      </View>
      <View style={{ justifyContent: 'center', paddingRight: 5}}>
      <Card.Actions>
        <MaterialCommunityIcons name='pencil-outline' style={styles.button} />
        <MaterialCommunityIcons name='trash-can-outline' style={styles.button} />
      </Card.Actions>
      </View>
      </View>
    </Card>
    </>
  )
}

const styles = StyleSheet.create({
  titleStyle: { fontSize: 18, fontWeight: 'bold' },
  card: {
    paddingTop: 10,
    paddingBottom: 10,
    elevation: 3,
    borderRadius: 12,
    paddingVertical: 5, 
    marginHorizontal: 20, 
    marginVertical: 10, 
    backgroundColor: '#E6E0E9', 
    color: '#0D2A4F'
  },
  cardHeader: {
    marginBottom: 3,
    fontSize: 17,
    fontWeight: '600',
    color: '#0D2A4F',
  },
  authorText: {
    fontSize: 15,
    color: '#0D2A4F',
  },
  button: {
    color: '#0A2543',
    fontSize: 24,
    paddingRight: 10
  }
})





