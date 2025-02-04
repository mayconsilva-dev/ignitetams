import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Container, Content, Icon } from './styles';

import { Highlight } from '@components/Highlight';
import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';

export function NewGroup(){
    
    const [group, setGroup] = useState('');

    const navigation = useNavigation()

    async function handleNew(){
      try {

        if (group.trim().length === 0){
          return Alert.alert('Nova Turma', 'Informe o nome da turma.')
        }
         await groupCreate(group);
         navigation.navigate('players', { group });

      } catch (error) {
        if(error instanceof AppError){
          Alert.alert('Novo Grupo', error.message);
        } else {
          Alert.alert('Nova Turma', 'Não foi possivel criar um nova turma.');
          console.log(error);
        }
      }
      
    }

    return(
        <Container>
            <Header showBackButton/>

            <Content>
                <Icon/>

                <Highlight
                  title="Nova Turma"
                  subtitle="Crie a turma para adicionar as pessoas"
                />

                <Input
                  placeholder="Nome da turma"
                  onChangeText={setGroup}
                />

                <Button
                  title="Criar"
                  style={{ marginTop: 20 }}
                  onPress={handleNew}
                />
            </Content>
        </Container>
    );
} 