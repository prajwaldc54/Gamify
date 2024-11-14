import {
  chakra,
  Flex,
  Icon,
  Spacer,
  Text,
  useCheckbox,
  useCheckboxGroup,
  UseCheckboxProps,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { nameFormat } from 'utils/nameFormat';
import { Team } from 'Schema/Schema';
import { getTeams } from 'api/team';
import { useSelector } from 'react-redux';
import { selectUser } from 'stores/reducers/userSlice';
import { Tick } from 'assets/icons/createpost';

type TeamCheckBoxListProps = {
  selectedTeams: Team['id'][];
  setSelectedTeams: React.Dispatch<React.SetStateAction<Team['id'][]>>;
};

interface CheckBoxProps extends UseCheckboxProps {
  label?: string;
}

const TeamCheckBoxList = (props: TeamCheckBoxListProps) => {
  const { selectedTeams, setSelectedTeams } = props;
  const [teams, setTeams] = useState<Team[]>([]);
  const toast = useToast();
  const { id: userId } = useSelector(selectUser);

  useEffect(() => {
    getTeams({ userId })
      .then((res) => {
        setTeams(res.data.data.items);
      })
      .catch((err) => {
        toast({
          title: 'Error',
          description: err.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  }, [userId]);

  function CustomCheckbox(props: CheckBoxProps | undefined) {
    const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
      useCheckbox(props);

    return (
      <chakra.label
        display="flex"
        flexDirection="row"
        alignItems="center"
        gridColumnGap={2}
        maxW="421px"
        rounded="lg"
        p={3}
        cursor="pointer"
        _hover={{
          background: 'gray.100',
        }}
        {...htmlProps}>
        <input {...getInputProps()} hidden />
        <Text bg="#D5D5D8" p={3} borderRadius="4px" {...getLabelProps()}>
          {nameFormat(props?.label)}
        </Text>
        <Flex direction="column">
          <Text {...getLabelProps()} fontWeight="medium">
            {props?.label}
          </Text>
          <Text
            as="span"
            {...getLabelProps()}
            fontSize="12px
          ">
            Only in {props?.label}
          </Text>
        </Flex>
        <Spacer />
        <Flex
          alignItems="center"
          justifyContent="center"
          border="2px solid"
          borderColor="#707070"
          w={5}
          h={5}
          borderRadius="4px"
          {...getCheckboxProps()}>
          {state.isChecked && <Icon as={Tick} w={4} h={4} />}
        </Flex>
      </chakra.label>
    );
  }

  const { value, getCheckboxProps } = useCheckboxGroup({
    defaultValue: [...selectedTeams],
  });

  useEffect(() => {
    setSelectedTeams(value as Team['id'][]);
  }, [value]);

  return (
    <Flex direction="column">
      <Flex direction="column" maxH="300px" overflowY="auto">
        {teams.map((data) => (
          <CustomCheckbox
            {...getCheckboxProps({
              value: `${data?.id}`,
              label: `${data?.teamName}`,
            })}
            key={data?.id}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default TeamCheckBoxList;
