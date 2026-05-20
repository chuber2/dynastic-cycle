// ── Primitives ────────────────────────────────────────────────────────────────

export type EpochTimeStamp = number

// ── Shared enums ──────────────────────────────────────────────────────────────

export type SleeperScoringType = "ppr" | "half_ppr" | "standard"

export type SleeperSeasonType = "regular" | "pre" | "post"

// ── User ──────────────────────────────────────────────────────────────────────

export type SleeperUser = {
  username: string
  user_id: string
  display_name: string | null
  avatar: string | null
  real_name: string | null
  is_bot: boolean
  metadata: Record<string, string> | null
  [key: string]: unknown
}

export type SleeperLeagueUser = SleeperUser & {
  team_name: string
  is_owner: boolean
}

// ── League ────────────────────────────────────────────────────────────────────

export type SleeperLeagueStatus =
  | "pre_draft"
  | "drafting"
  | "in_season"
  | "complete"

export type SleeperLeague = {
  league_id: string
  name: string
  status: SleeperLeagueStatus
  sport: "nfl"
  season: string
  season_type: SleeperSeasonType
  total_rosters: number
  draft_id: string
  previous_league_id: string | null
  avatar: string | null
  settings: Record<string, unknown>
  scoring_settings: Record<string, number>
  roster_positions: string[]
  metadata: Record<string, string> | null
  [key: string]: unknown
}

// ── Draft ─────────────────────────────────────────────────────────────────────

export type SleeperDraftType = "snake" | "auction" | "linear"

export type SleeperDraftStatus = "pre_draft" | "drafting" | "complete" | "paused"

export type SleeperDraftSettings = {
  teams: number
  rounds: number
  pick_timer: number
  slots_qb: number
  slots_rb: number
  slots_wr: number
  slots_te: number
  slots_k: number
  slots_flex: number
  slots_def: number
  slots_bn: number
}

export type SleeperDraftMetadata = {
  scoring_type: SleeperScoringType
  name: string
  description: string
}

export type SleeperDraft = {
  draft_id: string
  league_id: string
  type: SleeperDraftType
  status: SleeperDraftStatus
  sport: "nfl"
  season: string
  season_type: SleeperSeasonType
  settings: SleeperDraftSettings
  metadata: SleeperDraftMetadata
  start_time: EpochTimeStamp
  last_picked: EpochTimeStamp
  last_message_time: EpochTimeStamp
  last_message_id: string
  created: EpochTimeStamp
  draft_order: Record<string, number> | null
  creators: string[] | null
  [key: string]: unknown
}

// ── Roster & Picks ────────────────────────────────────────────────────────────

export type SleeperRoster = {
  roster_id: number
  owner_id: string
  league_id: string
  players: string[] | null
  starters: string[]
  reserve: string[] | null
  taxi: string[] | null
  co_owners: string[] | null
  settings: Record<string, number>
  metadata: Record<string, string> | null
}

export type SleeperDraftPick = {
  season: string
  round: number
  roster_id: number
}

export type SleeperTradedDraftPick = SleeperDraftPick & {
  owner_id: number
  previous_owner_id: number
}

// ── Player ────────────────────────────────────────────────────────────────────

export type SleeperPlayerStatus =
  | "Active"
  | "Inactive"
  | "PUP"
  | "Suspended"
  | "Practice Squad"
  | "Injured Reserve"
  | "Non-Football Injury"
  | "Commissioner Designated"

export type SleeperInjuryStatus =
  | "Questionable"
  | "Doubtful"
  | "Out"
  | "IR"
  | "PUP"
  | "DNR"

export type SleeperPracticeParticipation =
  | "Full Participant"
  | "Limited Participant"
  | "Did Not Participate"

export type SleeperPlayerKey = string

export type SleeperPlayerDetails = {
  // identity
  first_name: string
  last_name: string
  full_name: string | null
  player_id: string

  // bio — critical for dynasty value
  age: number | null
  birth_date: string | null
  height: string | null
  weight: string | null
  college: string | null
  years_exp: number | null

  // position / depth
  position: string
  fantasy_positions: string[]
  depth_chart_position: string | null
  depth_chart_order: number | null
  number: number | null
  sport: "nfl"

  // team
  team: string | null

  // status
  status: SleeperPlayerStatus | null
  active: boolean
  injury_status: SleeperInjuryStatus | null
  injury_start_date: string | null
  injury_body_part: string | null
  injury_notes: string | null
  practice_participation: SleeperPracticeParticipation | null

  // search / external
  hashtag: string | null
  search_last_name: string | null
  search_first_name: string | null
  search_rank: number | null
  fantasy_data_id: number | null

  [key: string]: unknown
}

export type SleeperPlayersMap = Record<SleeperPlayerKey, SleeperPlayerDetails>
