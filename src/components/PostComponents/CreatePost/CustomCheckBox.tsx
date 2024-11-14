import {
  Button,
  chakra,
  Flex,
  Icon,
  Spacer,
  Text,
  useCheckbox,
  useCheckboxGroup,
  UseCheckboxProps,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { nameFormat } from 'utils/nameFormat';
import { AudienceType, Teams } from 'Schema/Schema';
import useDidMountEffect from 'hooks/useDidMountEffect';
import { getTeams } from 'api/team';
import { useSelector } from 'react-redux';
import { selectUser } from 'stores/reducers/userSlice';
import { Tick } from 'assets/icons/createpost';

type CustomCheckBoxProps = {
  teams: Teams;
  setTeams: (value: Teams) => void;
  setAudience: (value: AudienceType) => void;
  setOption: (value: string) => void;
};

const CustomCheckBox = (props: CustomCheckBoxProps) => {
  const [allTeams, setAllTeams] = useState<Teams>([]);
  const [error, setError] = useState(false);
  const { teams, setTeams, setAudience, setOption } = props;

  const loggedInUserInformation = useSelector(selectUser);
  const loggedInUserId = loggedInUserInformation?.id;

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTeams({ userId: loggedInUserId });
      let team = res?.data?.data?.items.map((data: any) => {
        return { teamId: data?.id, teamName: data?.teamName };
      });
      setAllTeams(team);
    };
    fetchData();
  }, [loggedInUserId]);

  let selectedTeam = teams.map((item) => {
    return item?.teamName;
  });

  function CustomCheckbox(props: UseCheckboxProps | undefined) {
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
        px={3}
        py={1}
        cursor="pointer"
        {...htmlProps}>
        <input {...getInputProps()} hidden />
        <Text bg="#D5D5D8" p={3} borderRadius="4px" {...getLabelProps()}>
          {' '}
          {nameFormat(props?.value)}{' '}
        </Text>
        <Flex direction="column">
          <Text {...getLabelProps()} fontWeight="medium">
            {' '}
            {props?.value}
          </Text>
          <Text
            as="span"
            {...getLabelProps()}
            fontSize="12px
          ">
            {' '}
            Only in {props?.value}
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
    defaultValue: selectedTeam,
  });

  const handleSave = () => {
    if (value.length) {
      setError(false);
      let selectedTeam = allTeams.filter((item) =>
        value.includes(item?.teamName)
      );
      setOption('2');
      setTeams(selectedTeam);
      setAudience('');
    } else {
      setError(true);
    }
  };
  return (
    <Flex direction="column">
      <Flex direction="column" maxH="300px" overflowY="auto">
        {allTeams.map((data, index) => (
          <CustomCheckbox
            {...getCheckboxProps({ value: `${data?.teamName}` })}
            key={new Date().getTime() + `${index}`}
          />
        ))}
      </Flex>

      {error && (
        <Text fontSize="xs" color="danger.500" fontWeight="medium" mt={3}>
          * Please select the specific team to post
        </Text>
      )}

      <Flex mt={8}>
        <Button colorScheme="messenger" fontSize="14px" onClick={handleSave}>
          Save
        </Button>
        <Button
          variant="ghost"
          color="#707070"
          fontSize="14px"
          onClick={() => setAudience('All Team')}>
          Discard
        </Button>
      </Flex>
    </Flex>
  );
};

export default CustomCheckBox;
