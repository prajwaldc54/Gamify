import React from 'react';
import {
  Text,
  Button,
  Box,
  RadioGroup,
  Radio,
  Stack,
  Input,
} from '@chakra-ui/react';
import {
  PostFilterTypeEnum,
  Team,
  TeamFilterEnum,
  PostFilterViewEnum,
  PostSortByEnum,
} from 'Schema/Schema';
import TeamFilterRadioBoxList from '../Common/TeamFilterRadioBoxList';
import dayjs from 'dayjs';

type FilterFormProps = {
  sortBy?: PostSortByEnum;
  setSortBy?: React.Dispatch<React.SetStateAction<PostSortByEnum>>;
  type: PostFilterTypeEnum;
  setType: React.Dispatch<React.SetStateAction<PostFilterTypeEnum>>;
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  endDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  teamFilterType: TeamFilterEnum;
  setTeamFilterType: React.Dispatch<React.SetStateAction<TeamFilterEnum>>;
  setViewType: React.Dispatch<React.SetStateAction<PostFilterViewEnum>>;
  onSubmit: () => void;
  onClose: () => void;
  isMobileView: boolean;
};

const FilterForm: React.FC<FilterFormProps> = (props) => {
  const {
    sortBy,
    setSortBy,
    type,
    setType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    teamFilterType,
    setTeamFilterType,
    setViewType,
    onSubmit,
    onClose,
    isMobileView,
  } = props;
  const todayDateString = dayjs().format('YYYY-MM-DD');
  return (
    <Stack spacing="20px">
      {isMobileView && (
        <Box>
          <Text fontSize="sm" fontWeight="bold" marginBottom="10px">
            Sort By
          </Text>
          <RadioGroup
            onChange={(value) => setSortBy?.(value as PostSortByEnum)}
            value={sortBy}>
            <Stack direction="row">
              <Radio value={PostSortByEnum.LATEST}>Latest posts</Radio>
              <Radio value={PostSortByEnum.POPULARITY}>Popularity</Radio>
              <Radio value={PostSortByEnum.HELPFULNESS}>Helpful</Radio>
            </Stack>
          </RadioGroup>
        </Box>
      )}
      <Box>
        <Text fontSize="sm" fontWeight="bold" marginBottom="10px">
          Type
        </Text>
        <RadioGroup
          onChange={(value) => setType(value as PostFilterTypeEnum)}
          value={type}>
          <Stack direction="row">
            <Radio value={PostFilterTypeEnum.ALL}>All</Radio>
            <Radio value={PostFilterTypeEnum.DISCUSSION}>Discussion</Radio>
            <Radio value={PostFilterTypeEnum.URL}>URL</Radio>
          </Stack>
        </RadioGroup>
      </Box>
      <Box>
        <Text fontSize="sm" fontWeight="bold" marginBottom="10px">
          Date
        </Text>
        <Stack direction="row" spacing="12px">
          <Input
            type="date"
            value={startDate}
            max={todayDateString}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            type="date"
            value={endDate}
            max={todayDateString}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Stack>
      </Box>
      <Box>
        <Text fontSize="sm" fontWeight="bold" marginBottom="10px">
          Teams
        </Text>
        <TeamFilterRadioBoxList
          option={teamFilterType}
          setOption={setTeamFilterType}
          onSelectSpecificTeam={() =>
            setViewType(PostFilterViewEnum.SELECT_TEAM_VIEW)
          }
        />
      </Box>
      <Stack direction="row" spacing="12px">
        <Button colorScheme="blue" onClick={onSubmit}>
          Filter
        </Button>
        <Button onClick={onClose}>Discard</Button>
      </Stack>
    </Stack>
  );
};

export default FilterForm;
